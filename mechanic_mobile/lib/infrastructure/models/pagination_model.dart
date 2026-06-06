import '../../domain/entities/pagination_entity.dart';
import 'app_model_utils.dart';

class PaginationModel extends PaginationEntity {
  const PaginationModel({
    required super.page,
    required super.pageSize,
    required super.total,
    required super.totalPages,
    required super.hasNext,
    required super.hasPrevious,
  });

  factory PaginationModel.fromJson(Map<String, dynamic> json) {
    return PaginationModel(
      page: intOf(json['page']) ?? 1,
      pageSize: intOf(json['page_size']) ?? 0,
      total: intOf(json['total']) ?? 0,
      totalPages: intOf(json['total_pages']) ?? 0,
      hasNext: boolOf(json['has_next']),
      hasPrevious: boolOf(json['has_previous']),
    );
  }
}
