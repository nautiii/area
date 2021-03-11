import 'package:flutter/material.dart';

/// Widget that return a new button with custom configuration
/// When the button is pressed, call the callback parameter
class AuthButton extends StatelessWidget {
  final EdgeInsets edge;
  final Color background;
  final Color textColor;
  final String text;
  final Function callback;

  AuthButton(
      {this.edge, this.background, this.textColor, this.text, this.callback});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      margin: edge,
      alignment: Alignment.center,
      child: Row(
        children: <Widget>[
          Expanded(
            child: TextButton(
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                    vertical: 20.0, horizontal: 20.0),
                backgroundColor: background,
              ),
              onPressed: () => callback(),
              child: Text(text, style: TextStyle(color: textColor)),
            ),
          ),
        ],
      ),
    );
  }
}
