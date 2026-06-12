import 'package:flutter/foundation.dart';

class OfflineBannerController extends ChangeNotifier {
  bool _offline = false;
  String? _message;

  bool get offline => _offline;
  String? get message => _message;

  void setOffline(bool value, {String? message}) {
    if (_offline == value && _message == message) return;
    _offline = value;
    _message = message;
    notifyListeners();
  }
}
