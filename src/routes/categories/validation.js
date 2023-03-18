const checkCategoryBody = (categoryBody) => {
  return categoryBody.category_title === undefined;
};

const checkChannelBody = (channelBody) => {
  return (
    channelBody.channel_name === undefined ||
    channelBody.channel_image === undefined ||
    channelBody.channel_stream_url === undefined ||
    channelBody.tags === undefined
  );
};

module.exports = { checkCategoryBody, checkChannelBody };
