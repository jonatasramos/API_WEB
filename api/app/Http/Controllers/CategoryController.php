<?php

namespace App\Http\Controllers;

use App\Enums\StatusCodes;
use App\Models\Category as CategoryModel;
use Illuminate\Http\Request;
use Validator;

/**
 * Class CategoryController
 * @package App\Http\Controllers
 *
 * @author Jônatas Ramos
 */
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param int $establishment_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($establishment_id)
    {
        $category = CategoryModel::where('establishment_id', $establishment_id)->get();
        return response()->json([
            'message' => 'ok',
            'category' => $category
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
            'establishment_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = CategoryModel::create(
            $validator->validated()
        );

        return response()->json([
            'message' => 'Category successfully registered',
            'category' => $category
        ], StatusCodes::CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = CategoryModel::find($id);
        return response()->json([
            'message' => 'ok',
            'category' => $category
        ], StatusCodes::SUCCESS);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $category = CategoryModel::find($id);
        if ($category) {
            $category->name = $request->name;
            $category->save();
        }

        return response()->json([
            'message' => 'ok',
            'category' => $category
        ], StatusCodes::SUCCESS);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $category = CategoryModel::find($id);
        if ($category) {
            $category->delete();
            return response()->json([
                'message' => 'ok',
            ], StatusCodes::SUCCESS);
        }
    }
}
