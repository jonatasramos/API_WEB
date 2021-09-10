<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Category;
use App\Models\Item;

/**
 * Class Establishment
 * @package App\Models
 *
 * @author Jônatas Ramos
 */
class Establishment extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'establishment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category() {
        return $this->hasMany(Category::class);
    }

    /**
     * Relationship Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function item() {
        return $this->hasMany(Item::class);
    }
}
