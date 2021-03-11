import 'package:flutter/material.dart';

import 'package:area/screens/home.dart';
import 'package:area/screens/profile.dart';
import 'package:area/widgets/area_adder.dart';

/// Skeleton of main view managing [HomeScreen] and [ProfileScreen]
/// Also handle the adding of area thanks to the [AreaAdder] widget
/// The two screens are manage through a [BottomNavigationBar]
class App extends StatefulWidget {
  App({Key k});

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  List<Widget> screens = <Widget>[HomeScreen(), ProfileScreen()];
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          backgroundColor: Color(0xFF485679),
          title:
              const Text('Area', style: TextStyle(color: Color(0xFFe0e0e0)))),
      body: Center(child: screens.elementAt(_index)),
      floatingActionButton: AreaAdder(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomNavigationBar(
        showSelectedLabels: false,
        showUnselectedLabels: false,
        backgroundColor: Color(0xFF485679),
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: Icon(Icons.home, color: Color(0xFFe0e0e0)), label: 'HOME'),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_rounded, color: Color(0xFFe0e0e0)),
            label: 'PROFILE',
          )
        ],
        currentIndex: _index,
        onTap: (index) => setState(() {
          _index = index;
        }),
      ),
    );
  }
}
