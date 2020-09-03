using Core.Specs.SpecificationParams.Shared;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Runtime.InteropServices.WindowsRuntime;

namespace Core.Specs.SpecificationParams
{
    [SwaggerTag("Create, read, update and delete Products")]
    public class DeviceParams : BaseParams
    {
        [SwaggerParameter("The Id of a Category")]
        public int? CategoryId { get; set; }
        [SwaggerParameter("The Id of a Maker")]
        public int? MakerId { get; set; }
    }
}
