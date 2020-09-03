﻿using Microsoft.EntityFrameworkCore.Metadata;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Text.Json.Serialization;

namespace Core.Specs.SpecificationParams.Shared
{
    public class BaseParams
    {
        private const int MaxRecordsPerPage = 50;

        [SwaggerParameter("The page requested. Defaults to 1")]
        public int Page { get; set; } = 1;

        private int _recordsPerPage = 10;

        [SwaggerParameter("Records Per Page. Defaults = 10, Max 50")]
        public int RecordsPerPage
        {
            get => _recordsPerPage;
            set => _recordsPerPage = (value > MaxRecordsPerPage) ? MaxRecordsPerPage : value;
        }

        [SwaggerParameter("columnName + direction. e.g 'idDesc'. Default is 'idDesc'")]
        public string Sort { get; set; }

        private string _search;
        [SwaggerParameter("Search string")]
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}
