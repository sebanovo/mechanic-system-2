import 'package:equatable/equatable.dart';

import 'pagination_entity.dart';

class PagedResult<T> extends Equatable {
  const PagedResult({required this.items, required this.pagination});

  final List<T> items;
  final PaginationEntity pagination;

  @override
  List<Object?> get props => [items, pagination];
}
