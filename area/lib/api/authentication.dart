import 'package:http/http.dart' as http;

import 'dart:async';
import 'dart:convert';

import 'package:area/providers/auth_type.dart';
import 'package:area/api/config.dart' as conf;

/// API call to authenticate the user to database
/// Take user information in parameters
/// Return the authentication token obtained from database
Future<String> requestAccount(
    AuthType type, String username, String email, String password) async {
  final response = await http.post(
    Uri.parse('http://${conf.ip}:${conf.port}/api/user/${type.name}'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'username': username,
      'password': password,
      if (type == AuthType.register) 'email': email,
    }),
  );

  return (jsonDecode(response.body)['success'] == true)
      ? jsonDecode(response.body)['accessToken']
      : null;
}
