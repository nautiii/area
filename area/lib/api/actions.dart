import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';

import 'package:area/api/token.dart' as api;
import 'package:area/api/config.dart' as conf;

import 'dart:async';
import 'dart:convert';

/// API call to update an existing area
/// Take the list of necessary parameters and the area's id in parameter
/// The use of [Dio] is necessary to send complex data structure to the backend
Future<void> updateArea(
    List<String> data, List<String> parameters, String id) async {
  Dio dio = new Dio();
  dio.options.headers["access-token"] = api.token;

  await dio.patch(
    'http://${conf.ip}:${conf.port}/api/user/action',
    data: {
      '_id': id,
      'action': {
        'name': data[1],
        'service': data[0],
        'param': data[2],
        'type': 'string',
        'input': parameters[0],
      },
      'reaction': {
        'name': data[4],
        'service': data[3],
        'param': data[5],
        'type': 'string',
        'input': parameters[1],
      },
    },
  );
}

/// API call to delete an existing area
/// Take the area's id in parameter
Future<void> deleteArea(String id) async {
  final client = http.Client();

  await client.send(http.Request(
      'DELETE', Uri.parse('http://${conf.ip}:${conf.port}/api/user/action'))
    ..headers['access-token'] = api.token
    ..headers['Content-Type'] = 'application/json; charset=UTF-8'
    ..body = jsonEncode(<String, String>{
      '_id': id,
    }));
}

/// API call to get all areas from the authenticated user
Future<List<dynamic>> requestArea() async {
  final response = await http.get(
    Uri.parse('http://${conf.ip}:${conf.port}/api/user/actions'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'access-token': api.token,
    },
  );
  final actions = json.decode(response.body)['UserAction'] as List;

  return actions;
}

/// API call to add an new area
/// The use of [Dio] is necessary to send complex data structure to the backend
Future<void> registerArea(List<String> data, List<String> parameters) async {
  Dio dio = new Dio();
  dio.options.headers["access-token"] = api.token;

  await dio.post(
    'http://${conf.ip}:${conf.port}/api/user/action',
    data: {
      'action': {
        'name': data[1],
        'service': data[0],
        'param': data[2],
        'type': 'string',
        'input': parameters[0],
      },
      'reaction': {
        'name': data[4],
        'service': data[3],
        'param': data[5],
        'type': 'string',
        'input': parameters[1],
      },
    },
  );
}
