/* eslint-disable */

const createDtoInType = shape({
  name: uu5String(1, 255).isRequired(),
  members: array(uuIdentity()),
  });

const deleteDtoInType = shape({
  id: id().isRequired()
});

const getDtoInType = shape({
  id: id().isRequired(),
});

const updateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(1, 255),
  members: array(uuIdentity()),
  archive: boolean(),
});

const listDtoInType = shape({
  archive: boolean(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const itemCreateDtoInType = shape({
  listId: id().isRequired(),
  name: uu5String(1, 255).isRequired(),
  quantity: integer(1, 1000000),
});

const itemDeleteDtoInType = shape({
  listId: id().isRequired(),
  itemId: id().isRequired(),
});

const itemUpdateDtoInType = shape({
  listId: id().isRequired(),
  itemId: id().isRequired(),
  name: uu5String(1, 255),
  quantity: integer(1, 1000000),
  resolved: boolean(),
});
