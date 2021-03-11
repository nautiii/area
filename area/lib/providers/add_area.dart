import 'package:flutter/material.dart';

import 'package:area/api/actions.dart';
import 'package:area/api/services.dart';
import 'package:area/providers/service.dart';

class Item {
  Item({
    this.header,
    this.services,
    this.settings,
    this.isExpanded = false,
  });

  String header;
  List<String> services;
  Map<String, List<String>> settings;
  bool isExpanded;
}

List<Item> data;
List<String> params;

class AreaInputs extends StatefulWidget {
  @override
  _AreaInputsState createState() => _AreaInputsState();
}

class _AreaInputsState extends State<AreaInputs> {
  final _controllers = [TextEditingController(), TextEditingController()];
  String _placeholderAction = "enter your action's parameter here";
  String _placeholderReaction = "enter your reaction's parameter here";

  @override
  void initState() {
    super.initState();
    params = ['', ''];
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      TextField(
        controller: _controllers[0],
        style: TextStyle(color: Colors.black),
        textAlign: TextAlign.center,
        decoration: InputDecoration(
          border: InputBorder.none,
          hintText: _placeholderAction,
          hintStyle: TextStyle(color: Colors.grey.withOpacity(0.5)),
        ),
        onTap: () => _placeholderAction = '',
        onChanged: (parameter) => setState(() => params[0] = parameter),
        onSubmitted: (_) => setState(
            () => _placeholderAction = "enter your action's parameter here"),
      ),
      TextField(
        controller: _controllers[1],
        style: TextStyle(color: Colors.black),
        textAlign: TextAlign.center,
        decoration: InputDecoration(
          border: InputBorder.none,
          hintText: _placeholderReaction,
          hintStyle: TextStyle(color: Colors.grey.withOpacity(0.5)),
        ),
        onTap: () => setState(() => _placeholderReaction = ''),
        onChanged: (parameter) => setState(() => params[1] = parameter),
        onSubmitted: (_) => setState(() =>
            _placeholderReaction = "enter your reaction's parameter here"),
      )
    ]);
  }
}

Future<bool> getAreaInputs(BuildContext context) async {
  AlertDialog inputPopUp = AlertDialog(
    content: Container(
      height: MediaQuery.of(context).size.height / 7.4,
      alignment: Alignment.center,
      child: AreaInputs(),
    ),
    actions: <Widget>[
      TextButton(
        child: Text('Confirm'),
        onPressed: () => Navigator.of(context).pop(true),
      ),
      TextButton(
        child: Text('Cancel'),
        onPressed: () {
          params.clear();
          Navigator.of(context).pop(false);
        },
      )
    ],
  );

  return await showDialog(
      context: context, builder: (BuildContext context) => inputPopUp);
}

bool isValidArea() {
  if (data == null) return false;
  return (data[0].header != 'Action service' &&
      data[1].header != 'Select your action' &&
      data[2].header != 'Select your action parameter' &&
      data[3].header != 'Reaction service' &&
      data[4].header != 'Select your reaction' &&
      data[5].header != 'Select your reaction parameter');
}

Future<void> addServiceDialog(
    BuildContext context, String option, String id) async {
  List<Service> s = await requestServices() ?? [Service('', [], [])];

  AlertDialog areaPopUp = AlertDialog(
    title: Center(
        child: Text("Add Service", style: TextStyle(color: Color(0xFF363636)))),
    content: Container(
      height: MediaQuery.of(context).size.height / 2.0,
      alignment: Alignment.center,
      child: Panel(services: s),
    ),
    actions: <Widget>[
      TextButton(
        child: Text('Continue'),
        onPressed: () async {
          final inputState = await getAreaInputs(context);
          if (inputState == true) Navigator.of(context).pop(true);
        },
      ),
      TextButton(
        child: Text('Cancel'),
        onPressed: () => Navigator.of(context).pop(false),
      )
    ],
  );

  final state = await showDialog(
      context: context, builder: (BuildContext context) => areaPopUp);

  if (isValidArea() == false) return;
  if (state != null && state)
    (option == 'add')
        ? await registerArea(data.map((e) => e.header).toList(), params)
        : await updateArea(data.map((e) => e.header).toList(), params, id);
  if (params != null) params.clear();
}

class Panel extends StatefulWidget {
  final services;

  Panel({Key k, this.services}) : super(key: k);

  @override
  _PanelState createState() => _PanelState();
}

class _PanelState extends State<Panel> {
  List<String> _service = [];
  Map<String, List<String>> _action = Map();
  Map<String, List<String>> _reaction = Map();
  Map<String, List<String>> _actionParams = Map();
  Map<String, List<String>> _reactionParams = Map();

  @override
  void initState() {
    super.initState();

    for (Service s in widget.services) {
      _service.add(s.name);
      if (s.actions != null) {
        _action[s.name] = s.actions.map((e) => e['name'].toString()).toList();
        s.actions.forEach((e) {
          List<dynamic> tmp =
              e['params'].map((f) => f['name'] as String).toList();
          _actionParams[e['name'].toString()] = tmp.cast<String>();
        });
      }
      if (s.reactions != null) {
        _reaction[s.name] =
            s.reactions.map((e) => e['name'].toString()).toList();
        s.reactions.forEach((e) {
          List<dynamic> tmp =
              e['params'].map((f) => f['name'] as String).toList();
          _reactionParams[e['name'].toString()] = tmp.cast<String>();
        });
      }
    }
    data = <Item>[
      Item(header: 'Action service', services: _service, settings: Map()),
      Item(header: 'Select your action', services: [], settings: _action),
      Item(
          header: 'Select your action parameter',
          services: [],
          settings: _actionParams),
      Item(header: 'Reaction service', services: _service, settings: Map()),
      Item(header: 'Select your reaction', services: [], settings: _reaction),
      Item(
          header: 'Select your reaction parameter',
          services: [],
          settings: _reactionParams),
    ];
  }

  void resetHeader(int hdr) {
    if (hdr == 0) {
      data[1].header = 'Select your action';
      data[2].header = 'Select your action parameter';
    } else {
      data[4].header = 'Select your reaction';
      data[5].header = 'Select your reaction parameter';
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: ExpansionPanelList(
        expansionCallback: (int index, bool isExpanded) {
          setState(() => data[index].isExpanded = !isExpanded);
        },
        children: [
          for (int i = 0; i < 6; i++)
            ExpansionPanel(
              headerBuilder: (BuildContext context, bool isExpanded) =>
                  ListTile(title: Text(data[i].header)),
              body: Column(children: [
                if (i == 0 || i == 3)
                  for (String v in data[i].services ?? [])
                    ListTile(
                        title: Text(v),
                        onTap: () => setState(() {
                              data[i].header = v;
                              data[i].isExpanded = false;
                              resetHeader(i);
                            })),
                if (i != 0 && i != 3)
                  for (String v in data[i].settings[data[i - 1].header] ?? [])
                    ListTile(
                        title: Text(v),
                        onTap: () => setState(() {
                              data[i].header = v;
                              data[i].isExpanded = false;
                            })),
              ]),
              isExpanded: data[i].isExpanded,
            ),
        ],
      ),
    );
  }
}
