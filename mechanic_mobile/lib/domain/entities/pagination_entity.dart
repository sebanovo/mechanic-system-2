import 'package:equatable/equatable.dart';

class PaginationEntity extends Equatable {
  const PaginationEntity({
    required this.page,
    required this.pageSize,
    required this.total,
    required this.totalPages,
    required this.hasNext,
    required this.hasPrevious,
  });

  final int page;
  final int pageSize;
  final int total;
  final int totalPages;
  final bool hasNext;
  final bool hasPrevious;

  @override
  List<Object?> get props => [page, pageSize, total, totalPages, hasNext, hasPrevious];
}
