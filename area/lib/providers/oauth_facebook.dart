import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:area/api/facebook.dart';

import 'dart:io';

Future<bool> facebookOauth(BuildContext context) async => await Navigator.push(
    context, MaterialPageRoute(builder: (_) => FacebookLogin()));

class FacebookLogin extends StatefulWidget {
  @override
  FacebookLoginState createState() => FacebookLoginState();
}

class FacebookLoginState extends State<FacebookLogin> {
  final _id = '277117430438408';
  final _redirectUri = 'http://localhost/3000/callbackFacebook';
  final _url = 'https://www.facebook.com/v10.0';

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
          '$_url/dialog/oauth?client_id=$_id&response_type=token&redirect_uri=$_redirectUri',
      navigationDelegate: (NavigationRequest request) async {
        if (request.url.contains('error=access_denied'))
          Navigator.pop(context, false);
        if (!request.url.startsWith('$_redirectUri?#access_token'))
          return NavigationDecision.navigate;
        Uri uri = Uri.dataFromString(request.url);
        await storeFacebookToken(uri.queryParameters['#access_token']);
        Navigator.pop(context, true);
        return NavigationDecision.prevent;
      },
    );
  }
}
