const Notification = require("../models/notification");
const catchAsync = require("./../../utils/catchAsync");

const createNotification = catchAsync(async (req, res) => {
  const { message, recipient } = req.body;
  const notification = await Notification.create({ message, recipient });
  res.status(201).json(notification);
});

const getNotificationsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const notifications = await Notification.find({ recipient: userId }).sort({
    timestamp: -1,
  });
  res.json(notifications);
});

module.exports = {
  createNotification,
  getNotificationsByUser,
};
