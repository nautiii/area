class Service {
  String name;
  List actions;
  List reactions;

  Service(this.name, this.actions, this.reactions);

  factory Service.fromJson(dynamic json) => Service(json['name'] as String,
      json['actions'] as List, json['reactions'] as List);

  @override
  String toString() {
    return '{ ${this.name}, ${this.actions} }';
  }
}
