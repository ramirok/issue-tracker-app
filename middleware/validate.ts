import { body, oneOf, param, query, validationResult } from "express-validator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "./utils/handleError";

const checkProjectIdOptional = () => {
  return query("projectId").optional().isMongoId();
};
const checkTicketProjectId = () => {
  return body("project").isMongoId();
};
const checkTicketProjectIdOptional = () => {
  return body("project").optional().isMongoId();
};
const checkMongoIdInBody = () => {
  return body("_id").isMongoId();
};
const checkUserId = () => {
  return query("id").matches(/^[a-z0-9\|]+/i);
};
const checkTicketId = () => {
  return query("ticketId").isMongoId();
};
const checkProjectIdInQuery = () => {
  return query("projectId").optional().isMongoId();
};
const checkRoleInQuery = () => {
  return query("role").optional().isIn(["dev", "pm", "admin", "all"]);
};

const checkRoleInBody = () => {
  return body("role").isIn(["dev", "pm", "admin"]);
};

const checkProjectName = () => {
  return body("projectName").isLength({ min: 4 });
};
const checkProjectNameOptional = () => {
  return body("projectName").optional().isLength({ min: 4 });
};
const checkCompanyName = () => {
  return body("companyName").isLength({ min: 4 });
};
const checkCompanyNameOptional = () => {
  return body("companyName").optional().isLength({ min: 4 });
};
const checkTags = () => {
  return body("tags").custom((values: string[]) => {
    return (
      Array.isArray(values) && values.every((tag) => /^[a-z\d\s]+$/i.test(tag))
    );
  });
};
const checkTagsOptional = () => {
  return body("tags")
    .optional()
    .custom((values: string[]) => {
      return (
        Array.isArray(values) &&
        values.every((tag) => /^[a-z\d\s]+$/i.test(tag))
      );
    });
};
const checkMembers = () => {
  return body("members").custom((values: string[]) => {
    return (
      Array.isArray(values) &&
      values.every((member) => /^[a-zA-Z0-9\|]+$/.test(member))
    );
  });
};
const checkMembersOptional = () => {
  return body("members")
    .optional()
    .custom((values: string[]) => {
      return (
        Array.isArray(values) &&
        values.every((member) => /^[a-z0-9\|]+/i.test(member))
      );
    });
};

const checkCompletedOptional = () => {
  return body("completed").optional().isBoolean();
};
const checkTicketType = () => {
  return body("type").isIn(["Bug", "Feature"]);
};
const checkTicketTypeOptional = () => {
  return body("type").optional().isIn(["Bug", "Feature"]);
};
const checkPriority = () => {
  return body("priority").isIn(["Low", "Mid", "High"]);
};
const checkPriorityOptional = () => {
  return body("priority").optional().isIn(["Low", "Mid", "High"]);
};

const checkTicketName = () => {
  return body("name").isLength({ min: 4 });
};
const checkTicketNameOptional = () => {
  return body("name").optional().isLength({ min: 4 });
};

const checkTicketDetails = () => {
  return body("details").isLength({ min: 4 });
};
const checkTicketDetailsOptional = () => {
  return body("details").optional().isLength({ min: 4 });
};
const checkTicketSteps = () => {
  return body("steps").optional({ checkFalsy: true }).isLength({ min: 4 });
};
const checkTicketMembers = () => {
  return body("assigned").custom((values: string[]) => {
    return (
      Array.isArray(values) &&
      values.every((member) => /^[a-zA-Z0-9\|]+$/.test(member))
    );
  });
};
const checkTicketMembersOptional = () => {
  return body("assigned")
    .optional()
    .custom((values: string[]) => {
      return (
        Array.isArray(values) &&
        values.every((member) => /^[a-zA-Z0-9\|]+$/.test(member))
      );
    });
};

export function validateMiddleware(
  validations: ReturnType<typeof validate>,
  validateResults: typeof validationResult
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validateResults(req);

    if (errors.isEmpty()) {
      return;
    }

    throw new ValidationError("bad input");
  };
}

export const validate = (method: string) => {
  switch (method) {
    case "getUsers":
      return [checkProjectIdOptional(), checkRoleInQuery()];
    case "addRole":
      return [checkRoleInBody(), checkUserId()];
    case "removeRole":
      return [checkRoleInBody(), checkUserId()];
    case "createProject":
      return [
        checkProjectName(),
        checkCompanyName(),
        checkTags(),
        checkMembers(),
      ];
    case "editProject":
      return [
        checkProjectNameOptional(),
        checkCompanyNameOptional(),
        checkCompletedOptional(),
        checkTagsOptional(),
        checkMembersOptional(),
        checkMongoIdInBody(),
      ];
    case "deleteProject":
      return [checkMongoIdInBody()];
    case "getTicketsByProject":
      return [
        oneOf([checkProjectIdInQuery(), query("projectId").equals("all")]),
      ];
    case "createTicket":
      return [
        checkTicketType(),
        checkPriority(),
        checkTicketProjectId(),
        checkTicketName(),
        checkTicketDetails(),
        checkTicketSteps(),
        checkTicketMembers(),
      ];
    case "getSingleTicket":
      return [checkTicketId()];
    case "editTicket":
      return [
        checkTicketTypeOptional(),
        checkPriorityOptional(),
        checkTicketProjectIdOptional(),
        checkTicketNameOptional(),
        checkTicketDetailsOptional(),
        checkTicketSteps(),
        checkTicketMembersOptional(),
        checkMongoIdInBody(),
        checkCompletedOptional(),
      ];
    case "deleteTicket":
      return [checkMongoIdInBody()];
    default:
      return [];
  }
};
