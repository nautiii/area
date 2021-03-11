import 'package:http/http.dart' as http;

import 'package:area/api/token.dart' as api;
import 'package:area/providers/service.dart';
import 'package:area/api/config.dart' as conf;

import 'dart:async';
import 'dart:convert';

/// API call to get the list of all available services
/// If the request is successful, return the parsed json response from the server as a [List] of [Service]
/// If not, return null
Future<List<Service>> requestServices() async {
  final response = await http.get(
    Uri.parse('http://${conf.ip}:${conf.port}/api/actions'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'access-token': api.token,
    },
  );

  if (jsonDecode(response.body)['success'] == false) return null;
  return (jsonDecode(response.body)['services'] as List)
      .map((value) => Service.fromJson(value))
      .toList();
}

/// API call to logout from a third-party service
/// Take the service name in parameter
Future<void> disconnectService(String service) async {
  await http.patch(
    Uri.parse('http://${conf.ip}:${conf.port}/api/$service/logout'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'access-token': api.token,
    },
  );
}
