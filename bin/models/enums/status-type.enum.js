"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumStatusMessages = exports.EnumStatusType = void 0;
var EnumStatusType;
(function (EnumStatusType) {
    EnumStatusType[EnumStatusType["TODO"] = 0] = "TODO";
    EnumStatusType[EnumStatusType["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    EnumStatusType[EnumStatusType["DONE"] = 2] = "DONE";
})(EnumStatusType || (exports.EnumStatusType = EnumStatusType = {}));
exports.EnumStatusMessages = {
    [EnumStatusType.TODO]: 'To Do ',
    [EnumStatusType.IN_PROGRESS]: 'In Progress',
    [EnumStatusType.DONE]: 'Done',
};
//# sourceMappingURL=status-type.enum.js.map