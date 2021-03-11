import 'dart:core';

/// Global variables use to make http request to the backend
String ip = '192.168.1.100';
String port = '8080';

/// Global variable to make the services authentication persistent in front side
Map<String, bool> isConnect = {
  'Google': false,
  'Facebook': false,
  'Github': false,
  'Discord': false,
  'Spotify': false,
};
