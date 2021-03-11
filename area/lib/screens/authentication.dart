import 'package:flutter/material.dart';

import 'package:area/navigation/app.dart';
import 'package:area/api/authentication.dart';
import 'package:area/api/token.dart' as api;
import 'package:area/providers/auth_type.dart';
import 'package:area/providers/background.dart';
import 'package:area/widgets/area_logo.dart';
import 'package:area/widgets/auth_button.dart';

/// Render UI for authentication
class AuthenticationScreen extends StatefulWidget {
  AuthenticationScreen({Key k});

  @override
  _AuthenticationScreenState createState() => _AuthenticationScreenState();
}

/// State of the [AuthenticationScreen] widget
/// Logo of the app is located in assets/images folder and rendered by the [AreaLogo] widget
/// The [AuthButton] widget handle rendering and handling (with a list of [TextEditingController]) of user input
/// Storage of user information are then transferred to the backend via api call
class _AuthenticationScreenState extends State<AuthenticationScreen> {
  /// Background color of the app ( follow the Graphic Chart )
  final Color _fgColor = Color(0xFFF8F9F9);

  /// Handle input changes to store user data
  final List<TextEditingController> _controllers =
      List.generate(3, (_) => TextEditingController());
  AuthType _type = AuthType.login;

  String _username = '';
  String _email = '';
  String _password = '';
  String _placeholder = '';

  @override
  void initState() {
    super.initState();
    _placeholder = 'username';
  }

  /// Send user inputs in the backend by calling the requestAccount function
  /// If the function return a valid user token, go to the [App] screen
  void requestAccountFromDb() async {
    api.token = await requestAccount(_type, _username, _email, _password);
    if (api.token != null)
      Navigator.push(context, MaterialPageRoute(builder: (_) => App()));
    else {
      resetFields();
      resetFields();
      setState(() => _placeholder = "This account doesn't exist");
    }
  }

  /// reset all user inputs and controllers
  /// This function is call when the user switch from Login to Register page
  void resetFields() => setState(() {
        this._username = "";
        this._email = "";
        this._password = "";
        this._placeholder = 'username';
        _controllers.forEach((controller) => controller.clear());
        this._type =
            (this._type == AuthType.login) ? AuthType.register : AuthType.login;
      });

  /// Build each field of the screen with the good parameters
  /// This way you don't have to build one widget for each field
  /// The use of [BoxDecoration] gives a nice UI
  Widget buildField(IconData icon, String text, int index,
      TextEditingController controller, bool hide) {
    return Container(
      width: MediaQuery.of(context).size.width,
      margin: const EdgeInsets.only(left: 40.0, right: 40.0, top: 5.0),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
              color: this._fgColor, width: 0.5, style: BorderStyle.solid),
        ),
      ),
      padding: const EdgeInsets.only(left: 0.0, right: 10.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(top: 10.0, bottom: 10.0, right: 00.0),
            child: Icon(
              icon,
              color: this._fgColor,
            ),
          ),
          Expanded(
            child: Material(
              color: Colors.transparent,
              child: TextField(
                obscureText: hide,
                controller: controller,
                style: TextStyle(color: Color(0xFFF8F9F9)),
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: text,
                  hintStyle: TextStyle(
                      color: (text.contains("doesn't exist"))
                          ? Colors.red
                          : this._fgColor.withOpacity(0.5)),
                ),
                onChanged: (input) {
                  if (index == 0)
                    this._username = input;
                  else if (index == 1)
                    this._email = input;
                  else
                    this._password = input;
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: authBackground(),
      height: MediaQuery.of(context).size.height,
      child: Column(
        children: <Widget>[
          AreaLogo(path: 'assets/images/area_logo.png', fgColor: _fgColor),
          buildField(
              Icons.person_rounded, _placeholder, 0, _controllers[0], false),
          if (_type == AuthType.register)
            buildField(Icons.alternate_email, 'example@gmail.com', 1,
                _controllers[1], false),
          buildField(Icons.lock_open, '*********', 2, _controllers[2], true),
          AuthButton(
              edge: EdgeInsets.only(left: 40.0, right: 40.0, top: 30.0),
              background: Color(0xff7082b0),
              textColor: this._fgColor,
              text: _type == AuthType.login ? "Log In" : "Register",
              callback: this.requestAccountFromDb),
          if (_type == AuthType.login)
            AuthButton(
                edge: EdgeInsets.only(left: 40.0, right: 40.0, top: 10.0),
                background: Colors.transparent,
                textColor: Color(0xFFF8F9F9),
                text: "Forgot your password?",
                callback: () => {}),
          SizedBox(
            height: MediaQuery.of(context).size.height *
                (_type == AuthType.login ? 0.095 : 0.113),
          ),
          AuthButton(
              edge: EdgeInsets.only(left: 40.0, right: 40.0, top: 10.0),
              background: Colors.transparent,
              textColor: Color(0xFFF8F9F9),
              text: _type == AuthType.login
                  ? "Don't have an account ? Register"
                  : "Already have an account ? Login",
              callback: this.resetFields),
        ],
      ),
    );
  }
}
