import 'package:flutter/material.dart';

import 'package:area/providers/add_area.dart';

/// Widget to add new areas with [FloatingActionButton]
// ignore: must_be_immutable
class AreaAdder extends StatefulWidget {
  AreaAdder({Key k});

  @override
  _AreaAdderState createState() => _AreaAdderState();
}

/// Handle [AreaAdder] state
/// Main button of the application which call the addServiceDialog function when pressed
class _AreaAdderState extends State<AreaAdder> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.width * 0.2,
      width: MediaQuery.of(context).size.width * 0.2,
      child: FloatingActionButton(
        backgroundColor: Color(0xFF7082b0),
        onPressed: () async => await addServiceDialog(context, 'add', null),
        child: Icon(
          Icons.add,
          size: MediaQuery.of(context).size.width * 0.15,
          color: Color(0xFFe0e0e0),
        ),
      ),
    );
  }
}
