import 'package:flutter/material.dart';

/// Simple widget to render Area logo with nice design
class AreaLogo extends StatelessWidget {
  final String path;
  final Color fgColor;

  AreaLogo({this.path, this.fgColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 100.0, bottom: 70.0),
      child: Center(
        child: Column(
          children: <Widget>[
            Container(
              height: 148.0,
              width: 148.0,
              child: CircleAvatar(
                backgroundColor: Colors.transparent,
                foregroundColor: this.fgColor,
                radius: 100.0,
              ),
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.transparent,
                    width: 1.0,
                  ),
                  shape: BoxShape.rectangle,
                  image: DecorationImage(image: AssetImage(path))),
            ),
          ],
        ),
      ),
    );
  }
}
