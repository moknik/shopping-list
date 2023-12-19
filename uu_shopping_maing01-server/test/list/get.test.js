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

test("list/get success", async () => {
  const createListDtoIn = {
    name: "testList",
  };
  const resultCreateList = await TestHelper.executePostCommand("list/create", createListDtoIn);
  const result = await TestHelper.executeGetCommand("list/get", {id: resultCreateList.data.id});
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

test("list/get unsupported key", async () => {
  const createListDtoIn = {
    name: "testList",
    unsupportedKey: "unsupportedValue"
  };
  const resultCreateList = await TestHelper.executePostCommand("list/create", createListDtoIn);
  const result = await TestHelper.executeGetCommand("list/get", {id: resultCreateList.data.id, unsupportedKey: "unsupportedValue"});
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual(
    expect.objectContaining(
    {
      "uu-shopping-main/list/get/unsupportedKeys": {
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

test("list/get invalid dtoIn", async () => {
  const errorCode = "uu-shopping-main/list/get/invalidDtoIn";
  try {
    await TestHelper.executeGetCommand("list/get", {});
  }
  catch (e) {
    expect(e.code).toEqual(errorCode);
    expect(e.status).toEqual(400);
    expect(e.dtoOut.uuAppErrorMap).toEqual(
      expect.objectContaining(
    {
      [errorCode]: expect.objectContaining({
        "type": expect.stringContaining("error"),
        "message": "DtoIn is not valid."
      })
    }
    )
  );

    }
  }
  );

test("list/get list does not exist", async () => {
  const errorCode = "uu-shopping-main/list/get/noListFound/";
  try {
    await TestHelper.executeGetCommand("list/get", {id: "5e9b4e3e1c9d440000000000"});
  }
  catch (e) {
    expect(e.code).toEqual(errorCode);
    expect(e.status).toEqual(404);
    expect(e.dtoOut.uuAppErrorMap).toEqual(
      expect.objectContaining(
    {
      [errorCode]: expect.objectContaining({
        "type": expect.stringContaining("error"),
        "message":"List does not exist or you do not have permission."
      })
    }
    )
  );

    }
  }
  );
