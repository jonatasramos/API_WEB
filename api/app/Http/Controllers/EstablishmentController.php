<?php

namespace App\Http\Controllers;

use App\Models\Establishment as EstablishmentModel;
use Validator;
use App\Enums\StatusCodes;
use Illuminate\Http\Request;

/**
 * Class EstablishmentController
 * @package App\Http\Controllers
 *
 * @author Jônatas Ramos
 */
class EstablishmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $establishment = EstablishmentModel::with('category')->with('item.category')->get();
        return response()->json([
            'message' => 'ok',
            'establishment' => $establishment
        ], StatusCodes::SUCCESS);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $establishment = EstablishmentModel::create(
            $validator->validated()
        );

        return response()->json([
            'message' => 'Establishment successfully registered',
            'establishment' => $establishment
        ], StatusCodes::CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public
    function show($id)
    {
        $establishment = EstablishmentModel::with('category')->with('item.category')->find($id);
        return response()->json([
            'message' => 'ok',
            'establishment' => $establishment
        ], StatusCodes::SUCCESS);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public
    function update(Request $request, $id)
    {
        $establishment = EstablishmentModel::find($id);
        if ($establishment) {
            $establishment->name = $request->name;
            $establishment->save();
        }

        return response()->json([
            'message' => 'ok',
            'establishment' => $establishment
        ], StatusCodes::SUCCESS);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public
    function destroy($id)
    {
        $establishment = EstablishmentModel::find($id);
        if ($establishment) {
            $establishment->delete();
            return response()->json([
                'message' => 'ok',
            ], StatusCodes::SUCCESS);
        }
    }
}
