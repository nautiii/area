import 'package:flutter/material.dart';
import 'package:area/api/services.dart';

/// Widget button that handle third-party authenticated
/// When connected, update the global variable located in lib/api/config.dart
/// Main oauth2 function is handled by authCallback
class ServiceAuthButton extends StatelessWidget {
  final service;
  final authCallback;

  final isConnect;
  final updState;

  ServiceAuthButton(
      {Key k, this.service, this.authCallback, this.isConnect, this.updState});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(left: MediaQuery.of(context).size.width * 0.04),
      width: MediaQuery.of(context).size.width * 0.7,
      height: MediaQuery.of(context).size.height * 0.06,
      child: TextButton(
          style: TextButton.styleFrom(
            backgroundColor: Colors.white,
          ),
          onPressed: () async {
            if (isConnect) {
              await disconnectService(service.toString().toLowerCase());
              this.updState(false);
            } else if (await this.authCallback(context) == true)
              this.updState(true);
          },
          child: Align(
              alignment: Alignment.centerLeft,
              child: Row(children: <Widget>[
                Text(this.service,
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: MediaQuery.of(context).size.width * 0.04)),
              ]))),
    );
  }
}
