<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CategoryItem;
use App\Models\Category;

/**
 * Class Item
 * @package App\Models
 *
 * @author Jônatas Ramos
 */
class Item extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'item';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'establishment_id'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [ 'deleted_at' ];

    /**
     * Relationship Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function category() {
        return $this->belongsToMany(Category::class, 'category_item');
    }
}
