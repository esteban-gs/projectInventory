using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;

namespace Core.Specs
{
    public class DevicesWithCategoryAndMakerAndEmployeeDevices : BaseSpecification<Device>
    {
        public DevicesWithCategoryAndMakerAndEmployeeDevices(int skip, int take, string sort, int? categoryId, int? makerId)
            : base(x =>
                (categoryId == 0 || x.CategoryId == categoryId) &&
                (makerId == 0 || x.MakerId == makerId)
            )
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
            AddInclude(d => d.EmployeeDevice);

            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    // productId
                    case "productIdAsc":
                        ApplyOrderBy(d => d.ProductId);
                        break;                    
                    case "productIdDesc":
                        ApplyOrderByDescending(d => d.ProductId);
                        break;

                    // category
                    case "categoryAsc":
                        ApplyOrderBy(d => d.Category.Name);
                        break;                    
                    case "categoryDesc":
                        ApplyOrderByDescending(d => d.Category.Name);
                        break;

                    // makers
                    case "makerAsc":
                        ApplyOrderBy(d => d.Maker.Name);
                        break;                    
                    case "makerDesc":
                        ApplyOrderByDescending(d => d.Maker.Name);
                        break;

                    // employees
                    case "employeesAsc":
                        ApplyOrderBy(d => d.EmployeeDevice.Count);
                        break;                    
                    case "employeesDesc":
                        ApplyOrderByDescending(d => d.EmployeeDevice.Count);
                        break;
                                           
                    // purchasedDate
                    case "purchasedAsc":
                        ApplyOrderBy(d => d.Purchased);
                        break;                    
                    case "purcahsedDesc":
                        ApplyOrderByDescending(d => d.Purchased);
                        break;

                    // value
                    case "valueAsc":
                        ApplyOrderBy(d => d.Value);
                        break;
                    case "valueDesc":
                        ApplyOrderByDescending(d => d.Value);
                        break;

                    // Name
                    case "nameAsc":
                        ApplyOrderBy(d => d.Name);
                        break;
                    case "nameDesc":
                        ApplyOrderByDescending(d => d.Name);
                        break;

                    default:
                        ApplyOrderBy(d => d.Name);
                        break;
                }

                ApplyPaging(skip, take);
            }
        }
        public DevicesWithCategoryAndMakerAndEmployeeDevices(int id) : base(x => x.Id == id)
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
            AddInclude(d => d.EmployeeDevice);
        }
    }
}
