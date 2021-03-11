import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:area/api/github.dart';

import 'dart:io';

Future<bool> githubOauth(BuildContext context) async => await Navigator.push(
    context, MaterialPageRoute(builder: (_) => GithubLogin()));

class GithubLogin extends StatefulWidget {
  @override
  GithubLoginState createState() => GithubLoginState();
}

class GithubLoginState extends State<GithubLogin> {
  final _id = '0360b42df58644e440de';
  final _redirectUri = 'http://localhost:3000/callbackGithub';
  final _url = 'https://github.com/login';

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
          '$_url/oauth/authorize?client_id=$_id&redirect_uri=$_redirectUri',
      navigationDelegate: (NavigationRequest request) async {
        if (request.url.startsWith('$_url/oauth/authorize') ||
            request.url.startsWith('$_url')) return NavigationDecision.navigate;
        if (request.url.contains('?error=access_denied'))
          Navigator.pop(context, false);
        Uri uri = Uri.dataFromString(request.url);
        await storeGithubToken(uri.queryParameters['code']);
        Navigator.pop(context, true);
        return NavigationDecision.prevent;
      },
    );
  }
}
