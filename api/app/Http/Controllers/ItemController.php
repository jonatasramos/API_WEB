<?php

namespace App\Http\Controllers;

use App\Enums\StatusCodes;
use Illuminate\Http\Request;
use App\Models\Item as ItemModel;
use App\Models\CategoryItem as CategoryItemModel;
use Validator;
use function Laravel\Octane\Cache\forever;

/**
 * Class ItemController
 * @package App\Http\Controllers
 *
 * @author Jônatas Ramos
 */
class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param int $establishment_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($establishment_id)
    {
        $item = ItemModel::where('establishment_id', $establishment_id)->with('category')->get();
        return response()->json([
            'message' => 'ok',
            'item' => $item
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

        $item = ItemModel::create(
            $validator->validated()
        );

        if ($request->categories) {
            foreach ($request->categories as $category) {
                $categoryItem = new CategoryItemModel();
                $categoryItem->category_id = $category;
                $categoryItem->item_id = $item->id;
                $categoryItem->save();
            }
        }

        return response()->json([
            'message' => 'Item successfully registered',
            'item' => $item
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
        $item = ItemModel::with('category')->find($id);
        return response()->json([
            'message' => 'ok',
            'item' => $item
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
        $item = ItemModel::find($id);
        if ($item) {
            $item->name = $request->name;
            $item->save();
        }

        if ($request->categories) {
            CategoryItemModel::where('item_id', $id)->delete();

            foreach ($request->categories as $category) {
                $categoryItem = new CategoryItemModel();
                $categoryItem->category_id = $category;
                $categoryItem->item_id = $item->id;
                $categoryItem->save();
            }
        }

        return response()->json([
            'message' => 'ok',
            'item' => $item
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
        $item = ItemModel::find($id);
        if ($item) {
            $item->delete();
            return response()->json([
                'message' => 'ok',
            ], StatusCodes::SUCCESS);
        }
    }
}
