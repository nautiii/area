import 'package:flutter/material.dart';

BoxDecoration authBackground() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.centerLeft,
      end: Alignment(1.0, 0.0),
      colors: [Color(0xFF485679), Color(0xff363636)],
      tileMode: TileMode.repeated,
    ),
  );
}
