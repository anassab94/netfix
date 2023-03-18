const checkDrawerMenuItemBody = (drawerMenuItemBody) => {
  return (
    drawerMenuItemBody.title === undefined ||
    drawerMenuItemBody.icon === undefined ||
    drawerMenuItemBody.link === undefined
  );
};

module.exports = checkDrawerMenuItemBody;
