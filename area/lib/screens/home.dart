import 'package:flutter/material.dart';

import 'package:area/api/services.dart';
import 'package:area/api/actions.dart';
import 'package:area/providers/service.dart';
import 'package:area/providers/add_area.dart';
import 'package:area/widgets/service_connect.dart';
import 'package:tuple/tuple.dart';

import 'dart:async';

/// This function is called by the [HomeElements] to get all data needed by the UI
/// Get the [List] of all available services and all actions owned by the authenticated user
Future<Tuple2<List<dynamic>, List<Service>>> requestData() async {
  /// List of registered areas
  final areas = await requestArea();

  /// List of available services
  final services = await requestServices();

  return Tuple2(areas, services);
}

/// Render home elements with the [HomeElements] widget
/// Wrap UX/UI of areas list in [AreaList] and services in renderServices function
class HomeScreen extends StatefulWidget {
  HomeScreen({Key k});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

/// Wrap the main rendering widget [HomeElements]
/// Act as a [Container] for home page UI/UX element
class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: HomeElements(),
    );
  }
}

/// Main wrapper for home page elements
class HomeElements extends StatefulWidget {
  @override
  _HomeElementsState createState() => _HomeElementsState();
}

/// First use [FutureBuilder] to request asynchronous data before building the widget
/// The Home page is split into two parts: Service list rendered by the renderServices function, and the Area list rendered by the [AreaList] widget
class _HomeElementsState extends State<HomeElements> {
  /// Main rendering function which wrap the rendering of Services and that of Areas
  /// All different section are wrap inside a [Container]
  Widget renderList(
      BuildContext context, Tuple2<List<dynamic>, List<Service>> data) {
    return Column(
      children: <Widget>[
        renderServices(context, data.item2),
        Container(
            color: Color(0xFF485679),
            height: MediaQuery.of(context).size.height * 0.045,
            alignment: Alignment.center,
            child: Text("Your Areas",
                style: TextStyle(
                  backgroundColor: Color(0xFF485679),
                  color: Color(0xffe0e0e0),
                  fontSize: MediaQuery.of(context).size.height * 0.024,
                  fontWeight: FontWeight.bold,
                ))),
        Container(
            height: MediaQuery.of(context).size.height * 0.3995,
            child: AreaList(areas: data.item1)),
      ],
    );
  }

  /// Render list of services
  /// For each service, create a [ServiceConnectButton] to handle service authentication
  Widget renderServices(BuildContext context, List<Service> services) {
    return Container(
      padding: EdgeInsets.only(top: MediaQuery.of(context).size.height * 0.01),
      height: MediaQuery.of(context).size.height / 2.9,
      alignment: Alignment.center,
      child: Column(
        children: [
          for (var s in getServiceNames(services))
            ServiceConnectButton(service: s),
        ],
      ),
    );
  }

  /// Parse the list of sub-services to delete duplicates
  /// Return a list of unique service name (Google, Facebook, Github, ...)
  List<String> getServiceNames(List<Service> services) {
    List<String> name = [];

    services.forEach((service) {
      String _tmp = service.name.split(' ')[0];
      if (name.length == 0 ||
          name.firstWhere((n) => n == _tmp, orElse: () => null) == null)
        name.add(_tmp);
    });
    return name;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Tuple2<List<dynamic>, List<Service>>>(
      future: requestData(),
      builder: (BuildContext context,
              AsyncSnapshot<Tuple2<List<dynamic>, List<Service>>> snapshot) =>
          (snapshot.connectionState == ConnectionState.done)
              ? (snapshot.hasError || snapshot.data == null)
                  ? Text("No Service Available\n${snapshot.error}")
                  : this.renderList(context, snapshot.data)
              : (snapshot.connectionState == ConnectionState.waiting)
                  ? Text("Loading ...")
                  : this.renderList(context, Tuple2([], [])),
    );
  }
}

/// Main widget that handle rendering of actions/reactions
// ignore: must_be_immutable
class AreaList extends StatefulWidget {
  List<dynamic> areas;

  AreaList({Key k, this.areas});

  @override
  _AreaListState createState() => _AreaListState();
}

/// Handle state of the list hold by the [AreaList] widget
/// Every 30 seconds, get list of user areas with [Timer] and, if a change is detected, update it front side
/// The rendering of each area is in the form of a [Card] displaying all information, the whole wrap inside a [SingleChildScrollView]
/// Each [Card] possess a DELETE button to delete area and an UPDATE button to update area's configuration
class _AreaListState extends State<AreaList> {
  Timer timer;

  /// Initialize the timer to update areas every 30 seconds
  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(Duration(seconds: 30), (Timer t) async {
      final updAreas = await requestArea();
      if (widget.areas.length != updAreas.length)
        this.setState(() => widget.areas = updAreas);
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  /// Render a single area, taken in parameter
  Widget renderInfo(dynamic area, BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(left: MediaQuery.of(context).size.width * 0.1),
        child: Column(
          children: [
            Row(
              children: [
                Text('Action Service: ',
                    style: TextStyle(
                        color: Colors.black, fontWeight: FontWeight.bold)),
                Text(area['action']['service'] as String,
                    style: TextStyle(color: Colors.black)),
              ],
            ),
            Row(
              children: [
                Text('Action: ',
                    style: TextStyle(
                        color: Colors.black, fontWeight: FontWeight.bold)),
                Text(area['action']['name'] as String,
                    style: TextStyle(color: Colors.black)),
              ],
            ),
            Row(
              children: [
                Text('Reaction Service: ',
                    style: TextStyle(
                        color: Colors.black, fontWeight: FontWeight.bold)),
                Text(area['reaction']['service'] as String,
                    style: TextStyle(color: Colors.black)),
              ],
            ),
            Row(
              children: [
                Text('Reaction: ',
                    style: TextStyle(
                        color: Colors.black, fontWeight: FontWeight.bold)),
                Text(area['reaction']['name'] as String,
                    style: TextStyle(color: Colors.black)),
              ],
            )
          ],
        ));
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(children: [
        for (dynamic area in widget.areas)
          Card(
            clipBehavior: Clip.antiAlias,
            child: Column(
              children: [
                renderInfo(area, context),
                ButtonBar(
                  alignment: MainAxisAlignment.start,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                          right: MediaQuery.of(context).size.width * 0.53),
                      child: TextButton(
                        style: TextButton.styleFrom(
                          backgroundColor: Color(0xffe0e0e0),
                        ),
                        onPressed: () async {
                          await addServiceDialog(
                              context, 'update', area['_id'] as String);
                          final tmp = await requestArea();
                          setState(() {
                            widget.areas = tmp;
                          });
                        },
                        child: Text('UPDATE',
                            style: TextStyle(
                              color: Colors.black,
                            )),
                      ),
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.red,
                      ),
                      onPressed: () async {
                        await deleteArea(area['_id'] as String);
                        final tmp = await requestArea();
                        setState(() {
                          widget.areas = tmp;
                        });
                      },
                      child: Text('DELETE',
                          style: TextStyle(
                            color: Colors.white,
                          )),
                    ),
                  ],
                ),
              ],
            ),
          ),
      ]),
    );
  }
}
