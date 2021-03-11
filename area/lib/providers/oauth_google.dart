import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter/material.dart';

import 'package:area/api/google.dart';

GoogleSignIn googleConfig = GoogleSignIn(
  scopes: [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ],
  clientId:
      '178757248443-d1ajvp6kjg43256hjad88gat5glo0jpa.apps.googleusercontent.com',
);

Future<GoogleSignInAccount> signIn() async {
  try {
    if (await googleConfig.isSignedIn() == true)
      await googleConfig.disconnect();
    return await googleConfig.signIn();
  } catch (error) {
    return null;
  }
}

Future<bool> googleOauth(BuildContext context) async {
  GoogleSignInAccount acc = await signIn();

  if (acc == null) return false;
  GoogleSignInAuthentication auth = await acc.authentication;
  await storeGoogleToken(auth.accessToken);
  return true;
}
