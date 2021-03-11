import 'package:http/http.dart' as http;

import 'dart:async';
import 'dart:convert';

import 'package:area/api/token.dart' as api;
import 'package:area/api/config.dart' as conf;

/// API call to store facebook token in the backend
/// Take the third-party service token in parameter
Future<void> storeFacebookToken(String token) async {
  await http.patch(
    Uri.parse('http://${conf.ip}:${conf.port}/api/facebook/register'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'access-token': api.token,
    },
    body: jsonEncode(<String, String>{
      'token': token,
    }),
  );
}
