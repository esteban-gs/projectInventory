using Core.Entities;
using Core.Specs.SpecificationParams;
using Microsoft.EntityFrameworkCore;

namespace Core.Specs
{
    public class DevicesWithCategoryAndMakerAndEmployeeDevices : BaseSpecification<Device>
    {
        public DevicesWithCategoryAndMakerAndEmployeeDevices(DeviceParams deviceParams)
            : base(x =>
                (string.IsNullOrEmpty(deviceParams.Search) || 
                    x.Name.ToLower().Contains(deviceParams.Search) ||
                    x.ProductId.ToLower().Contains(deviceParams.Search) ||
                    x.Id.ToString().Contains(deviceParams.Search)
                ) &&
                (!deviceParams.CategoryId.HasValue || x.CategoryId == deviceParams.CategoryId) &&
                (!deviceParams.MakerId.HasValue || x.MakerId == deviceParams.MakerId)
            )
        {
            AddInclude(q => q.Include(d => d.Category));
            AddInclude(q => q.Include(d => d.Maker));
            AddInclude(q => q.Include(d => d.EmployeeDevice).ThenInclude(d => d.Employee));

            if (!string.IsNullOrEmpty(deviceParams.Sort))
            {
                switch (deviceParams.Sort)
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

                    // Id (PK)
                    case "idAsc":
                        ApplyOrderBy(d => d.Id);
                        break;
                    case "idDesc":
                        ApplyOrderByDescending(d => d.Id);
                        break;

                    default:
                        ApplyOrderByDescending(d => d.Id);
                        break;
                }
            }
            else // default sort
            {
                ApplyOrderByDescending(d => d.Id);
            }

            var skip = (deviceParams.Page - 1) * deviceParams.RecordsPerPage;
            ApplyPaging(skip, deviceParams.RecordsPerPage);
        }
        public DevicesWithCategoryAndMakerAndEmployeeDevices(int id) : base(x => x.Id == id)
        {
            AddInclude(q => q.Include(d => d.Category));
            AddInclude(q => q.Include(d => d.Maker));
            AddInclude(q => q.Include(d => d.EmployeeDevice).ThenInclude(d => d.Employee));
        }
    }
}
