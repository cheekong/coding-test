const generateId = () => Math.random().toString(36).substr(2, 9);

module.exports = function(name) {
    this.name = name;
    this.id = generateId();
}