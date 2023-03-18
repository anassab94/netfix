const checkAppSettingsBody = (appSettingsBody) => {
  return (
    appSettingsBody.show_ads === undefined ||
    appSettingsBody.admob_app_id === undefined ||
    appSettingsBody.admob_banner_id === undefined ||
    appSettingsBody.admob_interstitial_id === undefined ||
    appSettingsBody.show_share === undefined ||
    appSettingsBody.app_logo_cover === undefined ||
    appSettingsBody.app_version === undefined ||
    appSettingsBody.app_author === undefined ||
    appSettingsBody.app_email === undefined ||
    appSettingsBody.app_website === undefined ||
    appSettingsBody.app_privacy_policy === undefined
  );
};

module.exports = checkAppSettingsBody;
