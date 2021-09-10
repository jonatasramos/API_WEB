<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use App\Enums\StatusCodes;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
     * @throws Throwable
     */
    public function render($request, $exception)
    {
        if ($request->wantsJson()) {
            return $this->handleApiException($request, $exception);
        } else {
            $retval = parent::render($request, $exception);
        }

        return $retval;
    }

    /**
     * Error Handling
     *
     * @param $request
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    private function handleApiException($request, $exception)
    {
        $exception = $this->prepareException($exception);

        /**
         * HttpResponseException
         */
        if ($exception instanceof \Illuminate\Http\Exception\HttpResponseException) {
            $exception = $exception->getResponse();
        }

        /**
         * AuthenticationException
         */
        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            $exception = $this->unauthenticated($request, $exception);
        }

        /**
         * ValidationException
         */
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            $exception = $this->convertValidationExceptionToResponse($exception, $request);
        }

        return $this->customApiResponse($exception);
    }

    /**
     * Custom API response
     *
     * @param $exception
     * @return \Illuminate\Http\JsonResponse
     */
    private function customApiResponse($exception)
    {
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        } else {
            $statusCode = StatusCodes::SERVER_ERROR;
        }

        $response = [];

        switch ($statusCode) {
            case StatusCodes::UNAUTHORIZED:
                $response['message'] = 'Unauthorized';
                break;
            case StatusCodes::FORBIDDEN:
                $response['message'] = 'Forbidden';
                break;
            case StatusCodes::NOTFOUND:
                $response['message'] = 'Not Found';
                break;
            case StatusCodes::NOTALLOWED:
                $response['message'] = 'Method Not Allowed';
                break;
            case StatusCodes::UNPROCESSABLE_ENTITY:
                $response['message'] = $exception->original['message'];
                $response['errors'] = $exception->original['errors'];
                break;
            default:
                $response['message'] = ($statusCode == StatusCodes::SERVER_ERROR) ? 'Whoops, looks like something went wrong' : $exception->getMessage();
                break;
        }

        if (config('app.debug')) {
            $response['code'] = $exception->getCode();
        }
        $response['status'] = $statusCode;
        return response()->json($response, $statusCode);
    }

}
