<?php

namespace App\Enums;
use Rexlabs\Enum\Enum;

/**
 * Class StatusCodes
 * @package App\Enums
 * @author Jônatas Ramos
 *
 * @method static self SUCCESS()
 * @method static self CREATED()
 * @method static self BAD_REQUEST()
 * @method static self UNAUTHORIZED()
 * @method static self FORBIDDEN()
 * @method static self NOTFOUND()
 * @method static self NOTALLOWED()
 * @method static self UNPROCESSABLE_ENTITY()
 * @method static self SERVER_ERROR()
 */
class StatusCodes extends Enum
{
    const SUCCESS = 200;
    const CREATED = 201;
    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOTFOUND = 404;
    const NOTALLOWED = 405;
    const UNPROCESSABLE_ENTITY = 422;
    const SERVER_ERROR = 500;

}
