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

test("list/update success", async () => {
  const createListDtoIn = {
    name: "testList",
  };
  const resultCreateList = await TestHelper.executePostCommand("list/create", createListDtoIn);
  const result = await TestHelper.executePostCommand("list/update", {id: resultCreateList.data.id, name: "testList2", archive: true});
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual({});
  expect(result.data.name).toEqual("testList2");
  expect(result.data.awid).toEqual(TestHelper.getAwid());
  expect(result.data.owner).toEqual(TestHelper._userMap.Authorities.uuIdentity);
  expect(result.data.archive).toEqual(true);
  expect(result.data.sys).toBeDefined();
  expect(result.data.id).toBeDefined();
}
);

test("list/update unsupported key", async () => {
  const createListDtoIn = {
    name: "testList",
  };
  const resultCreateList = await TestHelper.executePostCommand("list/create", createListDtoIn);
  const result = await TestHelper.executePostCommand("list/update", {id: resultCreateList.data.id, name: "testList2", archive: true, unsupportedKey: "unsupportedValue"});
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual(
    expect.objectContaining(
    {
      "uu-shopping-main/list/update/unsupportedKeys": expect.objectContaining({
        "type": expect.stringContaining("warning"),
        "message": "DtoIn contains unsupported keys.",
        "paramMap": expect.objectContaining({
          "unsupportedKeyList": expect.arrayContaining(["$.unsupportedKey"])
        }
        )
      })
    }
    )
  );
}
);

test("list/update invalid dtoIn", async () => {
  const errorCode = "uu-shopping-main/list/update/invalidDtoIn";
  try {
    await TestHelper.executePostCommand("list/update", {});
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
        }
        )
      })
    );
  }
}
);

test("list/update list does not exist", async () => {
  const errorCode = "uu-shopping-main/list/update/noListFound/";
  try {
    await TestHelper.executePostCommand("list/update", {id: "5e9b4e3e1c9d440000000000"});
  }
  catch (e) {
    expect(e.code).toEqual(errorCode);
    expect(e.status).toEqual(404);
    expect(e.dtoOut.uuAppErrorMap).toEqual(
      expect.objectContaining(
    {
    [errorCode]: expect.objectContaining({
        "type": expect.stringContaining("error"),
        "message": "List does not exist or you do not have permission."
        }
        )
      })
    );
  }
}
);
