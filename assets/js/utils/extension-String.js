if (String.prototype.insert === undefined) {
  String.prototype.insert = function(string, index) {
    return this.slice(0, index) + string + this.slice(index)
  };
}