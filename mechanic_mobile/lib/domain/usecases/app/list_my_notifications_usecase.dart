import '../../entities/app_entities.dart';
import '../../repositories/notification_repository.dart';

class ListMyNotificationsUseCase {
  ListMyNotificationsUseCase(this._repository);

  final NotificationRepository _repository;

  Future<PagedResult<Map<String, dynamic>>> call({
    String? status,
    int? page,
    int? pageSize,
  }) =>
      _repository.listMyNotifications(
        status: status,
        page: page,
        pageSize: pageSize,
      );
}
