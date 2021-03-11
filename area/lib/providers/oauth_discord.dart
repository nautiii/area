import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;

import 'package:area/api/discord.dart';

import 'dart:convert';
import 'dart:io';

Future<bool> discordOauth(BuildContext context) async => await Navigator.push(
    context, MaterialPageRoute(builder: (_) => DiscordLogin()));

class DiscordLogin extends StatefulWidget {
  @override
  DiscordLoginState createState() => DiscordLoginState();
}

class DiscordLoginState extends State<DiscordLogin> {
  final _id = '811583547752185857';
  final _secret = 'Xc3uRBHEUFCPINClaVTi_DYBHFehuKMH';
  final _redirectUri = 'http://localhost:3000/callbackDiscord';
  final _url = 'https://discord.com/oauth2';
  final _scope = 'identify+email+connections+guilds+bot';

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
          '$_url/authorize?client_id=$_id&redirect_uri=$_redirectUri&response_type=code&scope=$_scope&permissions=2048',
      navigationDelegate: (NavigationRequest request) async {
        if (request.url.startsWith('$_url/authorize'))
          return NavigationDecision.navigate;
        if (request.url.contains('?error=access_denied'))
          Navigator.pop(context, false);
        final token = await this.getDiscordToken(request);
        if (token == null) Navigator.pop(context, false);
        await storeDiscordToken(token);
        Navigator.pop(context, true);
        return NavigationDecision.prevent;
      },
    );
  }

  Future<String> getDiscordToken(NavigationRequest request) async {
    Uri uri = Uri.dataFromString(request.url);

    final result = await http.post(
      Uri.https('discord.com', 'api/v8/oauth2/token'),
      body: <String, String>{
        'grant_type': 'authorization_code',
        'client_id': this._id,
        'client_secret': this._secret,
        'code': uri.queryParameters['code'],
        'redirect_uri': this._redirectUri,
        'scope': 'identify email',
      },
      headers: <String, String>{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    );

    return json.decode(result.body)['access_token'];
  }
}
