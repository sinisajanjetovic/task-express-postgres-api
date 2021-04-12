const fs = require("fs");
const path = require("path");

module.exports = class CarModel {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
};
