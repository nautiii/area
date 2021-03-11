import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;

import 'package:area/api/spotify.dart';

import 'dart:convert';
import 'dart:io';

Future<bool> spotifyOauth(BuildContext context) async => await Navigator.push(
    context, MaterialPageRoute(builder: (_) => SpotifyLogin()));

class SpotifyLogin extends StatefulWidget {
  @override
  SpotifyLoginState createState() => SpotifyLoginState();
}

class SpotifyLoginState extends State<SpotifyLogin> {
  final _id = '35109c16a1ed4b79b477b68ed36679a0';
  final _secret = 'fbae154e05984131a8e284dcebe5616c';
  final _redirectUri = 'http://localhost:3000/callbackSpotify';
  final _url = 'https://accounts.spotify.com';
  final _scope =
      'user-read-private+user-library-read+playlist-read-private+user-read-currently-playing';

  @override
  void initState() {
    super.initState();
    if (Platform.isAndroid) WebView.platform = SurfaceAndroidWebView();
  }

  @override
  Widget build(BuildContext context) {
    return WebView(
      javascriptMode: JavascriptMode.unrestricted,
      gestureNavigationEnabled: true,
      initialUrl:
          '$_url/authorize?client_id=$_id&redirect_uri=$_redirectUri&response_type=code&scope=$_scope',
      navigationDelegate: (NavigationRequest request) async {
        if (request.url.startsWith(_redirectUri) == false)
          return NavigationDecision.navigate;
        if (request.url.contains('?error=access_denied'))
          Navigator.pop(context, false);
        final token = await this.getSpotifyToken(request);
        if (token == null) Navigator.pop(context, false);
        await storeSpotifyToken(token);
        Navigator.pop(context, true);
        return NavigationDecision.prevent;
      },
    );
  }

  Future<String> getSpotifyToken(NavigationRequest request) async {
    Uri uri = Uri.dataFromString(request.url);

    final result = await http.post(
      Uri.https('accounts.spotify.com', 'api/token'),
      body: <String, String>{
        'grant_type': 'authorization_code',
        'client_id': this._id,
        'client_secret': this._secret,
        'code': uri.queryParameters['code'],
        'redirect_uri': this._redirectUri,
      },
      headers: <String, String>{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    );
    return json.decode(result.body)['access_token'];
  }
}
