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

test("list/delete success", async () => {
  const createListDtoIn = {
    name: "testList",
  };
  const resultCreateList = await TestHelper.executePostCommand("list/create", createListDtoIn);
  const result = await TestHelper.executePostCommand("list/delete", {id: resultCreateList.data.id});
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual({});
}
);
test("list/delete unsupported key", async () => {
  const createListDtoIn = {
    name: "testList",
  };
  const resultCreateList = await TestHelper.executePostCommand("list/create", createListDtoIn);
  const result = await TestHelper.executePostCommand("list/delete", {id: resultCreateList.data.id, unsupportedKey: "unsupportedValue"});
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual(
    expect.objectContaining(
    {
      "uu-shopping-main/list/delete/unsupportedKeys": expect.objectContaining({
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

test("list/delete invalid dtoIn", async () => {
  const errorCode = "uu-shopping-main/list/delete/invalidDtoIn";
  try {
    await TestHelper.executePostCommand("list/delete", {});
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
