import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:tuple/tuple.dart';

import 'package:area/api/config.dart' as config;
import 'package:area/providers/oauth_google.dart';
import 'package:area/providers/oauth_discord.dart';
import 'package:area/providers/oauth_github.dart';
import 'package:area/providers/oauth_spotify.dart';
import 'package:area/providers/oauth_facebook.dart';
import 'package:area/widgets/service_auth.dart';

typedef Future<bool> ServiceOauth(BuildContext context);

/// Wrapper for service button authentication
class ServiceConnectButton extends StatefulWidget {
  final service;

  ServiceConnectButton({Key k, this.service});

  @override
  _ServiceConnectButtonState createState() => _ServiceConnectButtonState();
}

/// Handle state of [ServiceConnectButton] thanks to the _data variable
/// Each service config is initialize in a [Map] with each parameters
class _ServiceConnectButtonState extends State<ServiceConnectButton> {
  Map<String, Tuple3<IconData, ServiceOauth, bool>> _data;

  @override
  void initState() {
    super.initState();

    _data = {
      'Google':
          Tuple3(MdiIcons.google, googleOauth, config.isConnect['Google']),
      'Facebook': Tuple3(
          MdiIcons.facebook, facebookOauth, config.isConnect['Facebook']),
      'Github':
          Tuple3(MdiIcons.github, githubOauth, config.isConnect['Github']),
      'Discord':
          Tuple3(MdiIcons.discord, discordOauth, config.isConnect['Discord']),
      'Spotify':
          Tuple3(MdiIcons.spotify, spotifyOauth, config.isConnect['Spotify']),
    };
  }

  @override
  Widget build(BuildContext context) {
    if (_data[widget.service] == null) return Container();
    return Padding(
        padding: EdgeInsets.only(
            top: MediaQuery.of(context).size.height * 0.001,
            left: MediaQuery.of(context).size.width * 0.05),
        child: Row(
          children: <Widget>[
            Icon(
              _data[widget.service].item1,
              size: MediaQuery.of(context).size.width * 0.06,
            ),
            ServiceAuthButton(
                service: widget.service,
                authCallback: _data[widget.service].item2,
                isConnect: _data[widget.service].item3,
                updState: (state) => setState(() {
                      config.isConnect.update(widget.service, (value) => state);
                      _data.update(widget.service,
                          (dynamic val) => Tuple3(val.item1, val.item2, state));
                    })),
            Padding(
                padding: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 0.05),
                child: Icon(
                  _data[widget.service].item3
                      ? MdiIcons.logout
                      : MdiIcons.accountPlus,
                  color:
                      _data[widget.service].item3 ? Colors.red : Colors.green,
                  size: MediaQuery.of(context).size.width * 0.06,
                ))
          ],
        ));
  }
}
