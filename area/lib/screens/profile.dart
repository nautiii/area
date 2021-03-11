import 'package:flutter/material.dart';

import 'package:area/api/config.dart' as conf;
import 'package:string_validator/string_validator.dart' as tools;

/// Profile screen that display server configuration
class ProfileScreen extends StatefulWidget {
  ProfileScreen({Key k});

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

/// State of the Profile main widget
/// Provide two [TextField] to change ip address and port of backend if needed
/// Store updated values inside global variables in lib/api/config.dart
class _ProfileScreenState extends State<ProfileScreen> {
  final _controllers = [TextEditingController(), TextEditingController()];
  String _placeholderPort = 'enter a valid port';
  String _placeholderIp = 'enter a valid ip address';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
          margin: EdgeInsets.only(top: MediaQuery.of(context).size.width * 0.1),
          child: Center(
              child: Column(
            children: [
              Text("Current server ip: ${conf.ip}",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  )),
              TextField(
                controller: _controllers[0],
                style: TextStyle(color: Colors.black),
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: _placeholderIp,
                  hintStyle: TextStyle(color: Colors.grey.withOpacity(0.5)),
                ),
                onTap: () => _placeholderIp = '',
                onSubmitted: (ip) => setState(() {
                  _controllers[0].clear();
                  _placeholderIp = 'enter a valid ip address';
                  if (tools.isIP(ip, 4)) conf.ip = ip;
                }),
              ),
              Text("Current server port: ${conf.port}",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  )),
              TextField(
                controller: _controllers[1],
                style: TextStyle(color: Colors.black),
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: _placeholderPort,
                  hintStyle: TextStyle(color: Colors.grey.withOpacity(0.5)),
                ),
                onTap: () => setState(() => _placeholderPort = ''),
                onSubmitted: (port) => setState(() {
                  _controllers[1].clear();
                  _placeholderPort = 'enter a valid port';
                  if (double.parse(port, (e) => null) != null) conf.port = port;
                }),
              )
            ],
          ))),
    );
  }
}
