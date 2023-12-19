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

test("list/list success", async () => {
  const result = await TestHelper.executeGetCommand("list/list");
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual({});
}
);

test("list/list unsupported keys", async () => {
  const result = await TestHelper.executeGetCommand("list/list", {unsupportedKey: "unsupportedValue"});
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual(
    expect.objectContaining(
    {
      "uu-shopping-main/list/list/unsupportedKeys": {
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
