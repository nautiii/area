import 'package:flutter/material.dart';
import 'package:area/screens/authentication.dart';

/// Main widget of the project
/// Provide the authentication screen by rendering the [AuthenticationScreen] widget
/// Use the [MaterialApp] widget to wrap all application widget children
class Area extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AuthenticationScreen(),
    );
  }
}
