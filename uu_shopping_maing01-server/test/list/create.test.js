const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
  await TestHelper.login("Authorities");
}
);

afterEach(async () => {
  await TestHelper.teardown();
}
);


test("list/create success", async () => {
  const createListDtoIn = {
    name: "testList",
  };
  const result = await TestHelper.executePostCommand("list/create", createListDtoIn);
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual({});
  expect(result.data.name).toEqual(createListDtoIn.name);
  expect(result.data.awid).toEqual(TestHelper.getAwid());
  expect(result.data.owner).toEqual(TestHelper._userMap.Authorities.uuIdentity);
  expect(result.data.archive).toEqual(false);
  expect(result.data.sys).toBeDefined();
  expect(result.data.id).toBeDefined();
}
);

test("list/create unsupported key", async () => {
  const createListDtoIn = {
    name: "testList",
    unsupportedKey: "unsupportedValue"
  };
  const result = await TestHelper.executePostCommand("list/create", createListDtoIn);
  expect(result.status).toEqual(200);
  expect(result.data.name).toEqual(createListDtoIn.name);
  expect(result.data.awid).toEqual(TestHelper.getAwid());
  expect(result.data.owner).toEqual(TestHelper._userMap.Authorities.uuIdentity);
  expect(result.data.archive).toEqual(false);
  expect(result.data.sys).toBeDefined();
  expect(result.data.id).toBeDefined();
  expect(result.data.uuAppErrorMap).toEqual(
    expect.objectContaining(
    {
      "uu-shopping-main/list/create/unsupportedKeys": {
        "type": expect.stringContaining("warning"),
        "message": "DtoIn contains unsupported keys.",
        "paramMap": expect.objectContaining({
          "unsupportedKeyList": expect.arrayContaining(["$.unsupportedKey"])
        }
        )
      }
    }
    )
  );
}
);

test("list/create invalid dtoIn", async () => {
  const createListDtoIn = {
    name: 1,
  };
  const errorCode = "uu-shopping-main/list/create/invalidDtoIn";
  try {
    await TestHelper.executePostCommand("list/create", createListDtoIn);
  }
  catch (e) {
    expect(e.code).toEqual(errorCode);
    expect(e.status).toEqual(400);
    expect(e.dtoOut.uuAppErrorMap).toEqual(
        expect.objectContaining(
      {
        [errorCode]: expect.objectContaining( {
          "type": expect.stringContaining("error"),
          "message": "DtoIn is not valid."
        })
      }
      )
    );
  }
}
);

