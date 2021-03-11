enum AuthType {
  login,
  register,
}

extension AuthTypeExtension on AuthType {
  String get name {
    return this == AuthType.login ? 'login' : 'register';
  }
}
